package br.ufrj.cos482.service.impl;

import br.ufrj.cos482.service.AlunoDoutoradoService;
import br.ufrj.cos482.domain.AlunoDoutorado;
import br.ufrj.cos482.repository.AlunoDoutoradoRepository;
import br.ufrj.cos482.service.dto.AlunoDoutoradoDTO;
import br.ufrj.cos482.service.mapper.AlunoDoutoradoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing AlunoDoutorado.
 */
@Service
@Transactional
public class AlunoDoutoradoServiceImpl implements AlunoDoutoradoService{

    private final Logger log = LoggerFactory.getLogger(AlunoDoutoradoServiceImpl.class);
    
    @Inject
    private AlunoDoutoradoRepository alunoDoutoradoRepository;

    @Inject
    private AlunoDoutoradoMapper alunoDoutoradoMapper;

    /**
     * Save a alunoDoutorado.
     *
     * @param alunoDoutoradoDTO the entity to save
     * @return the persisted entity
     */
    public AlunoDoutoradoDTO save(AlunoDoutoradoDTO alunoDoutoradoDTO) {
        log.debug("Request to save AlunoDoutorado : {}", alunoDoutoradoDTO);
        AlunoDoutorado alunoDoutorado = alunoDoutoradoMapper.alunoDoutoradoDTOToAlunoDoutorado(alunoDoutoradoDTO);
        alunoDoutorado = alunoDoutoradoRepository.save(alunoDoutorado);
        AlunoDoutoradoDTO result = alunoDoutoradoMapper.alunoDoutoradoToAlunoDoutoradoDTO(alunoDoutorado);
        return result;
    }

    /**
     *  Get all the alunoDoutorados.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<AlunoDoutoradoDTO> findAll() {
        log.debug("Request to get all AlunoDoutorados");
        List<AlunoDoutoradoDTO> result = alunoDoutoradoRepository.findAll().stream()
            .map(alunoDoutoradoMapper::alunoDoutoradoToAlunoDoutoradoDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one alunoDoutorado by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public AlunoDoutoradoDTO findOne(Long id) {
        log.debug("Request to get AlunoDoutorado : {}", id);
        AlunoDoutorado alunoDoutorado = alunoDoutoradoRepository.findOne(id);
        AlunoDoutoradoDTO alunoDoutoradoDTO = alunoDoutoradoMapper.alunoDoutoradoToAlunoDoutoradoDTO(alunoDoutorado);
        return alunoDoutoradoDTO;
    }

    /**
     *  Delete the  alunoDoutorado by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete AlunoDoutorado : {}", id);
        alunoDoutoradoRepository.delete(id);
    }
}
