package br.ufrj.cos482.service.impl;

import br.ufrj.cos482.service.AlunoMestradoService;
import br.ufrj.cos482.domain.AlunoMestrado;
import br.ufrj.cos482.repository.AlunoMestradoRepository;
import br.ufrj.cos482.service.dto.AlunoMestradoDTO;
import br.ufrj.cos482.service.mapper.AlunoMestradoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing AlunoMestrado.
 */
@Service
@Transactional
public class AlunoMestradoServiceImpl implements AlunoMestradoService{

    private final Logger log = LoggerFactory.getLogger(AlunoMestradoServiceImpl.class);
    
    @Inject
    private AlunoMestradoRepository alunoMestradoRepository;

    @Inject
    private AlunoMestradoMapper alunoMestradoMapper;

    /**
     * Save a alunoMestrado.
     *
     * @param alunoMestradoDTO the entity to save
     * @return the persisted entity
     */
    public AlunoMestradoDTO save(AlunoMestradoDTO alunoMestradoDTO) {
        log.debug("Request to save AlunoMestrado : {}", alunoMestradoDTO);
        AlunoMestrado alunoMestrado = alunoMestradoMapper.alunoMestradoDTOToAlunoMestrado(alunoMestradoDTO);
        alunoMestrado = alunoMestradoRepository.save(alunoMestrado);
        AlunoMestradoDTO result = alunoMestradoMapper.alunoMestradoToAlunoMestradoDTO(alunoMestrado);
        return result;
    }

    /**
     *  Get all the alunoMestrados.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<AlunoMestradoDTO> findAll() {
        log.debug("Request to get all AlunoMestrados");
        List<AlunoMestradoDTO> result = alunoMestradoRepository.findAll().stream()
            .map(alunoMestradoMapper::alunoMestradoToAlunoMestradoDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one alunoMestrado by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public AlunoMestradoDTO findOne(Long id) {
        log.debug("Request to get AlunoMestrado : {}", id);
        AlunoMestrado alunoMestrado = alunoMestradoRepository.findOne(id);
        AlunoMestradoDTO alunoMestradoDTO = alunoMestradoMapper.alunoMestradoToAlunoMestradoDTO(alunoMestrado);
        return alunoMestradoDTO;
    }

    /**
     *  Delete the  alunoMestrado by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete AlunoMestrado : {}", id);
        alunoMestradoRepository.delete(id);
    }
}
