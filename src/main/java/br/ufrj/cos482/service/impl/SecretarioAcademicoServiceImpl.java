package br.ufrj.cos482.service.impl;

import br.ufrj.cos482.service.SecretarioAcademicoService;
import br.ufrj.cos482.domain.SecretarioAcademico;
import br.ufrj.cos482.repository.SecretarioAcademicoRepository;
import br.ufrj.cos482.service.dto.SecretarioAcademicoDTO;
import br.ufrj.cos482.service.mapper.SecretarioAcademicoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing SecretarioAcademico.
 */
@Service
@Transactional
public class SecretarioAcademicoServiceImpl implements SecretarioAcademicoService{

    private final Logger log = LoggerFactory.getLogger(SecretarioAcademicoServiceImpl.class);
    
    @Inject
    private SecretarioAcademicoRepository secretarioAcademicoRepository;

    @Inject
    private SecretarioAcademicoMapper secretarioAcademicoMapper;

    /**
     * Save a secretarioAcademico.
     *
     * @param secretarioAcademicoDTO the entity to save
     * @return the persisted entity
     */
    public SecretarioAcademicoDTO save(SecretarioAcademicoDTO secretarioAcademicoDTO) {
        log.debug("Request to save SecretarioAcademico : {}", secretarioAcademicoDTO);
        SecretarioAcademico secretarioAcademico = secretarioAcademicoMapper.secretarioAcademicoDTOToSecretarioAcademico(secretarioAcademicoDTO);
        secretarioAcademico = secretarioAcademicoRepository.save(secretarioAcademico);
        SecretarioAcademicoDTO result = secretarioAcademicoMapper.secretarioAcademicoToSecretarioAcademicoDTO(secretarioAcademico);
        return result;
    }

    /**
     *  Get all the secretarioAcademicos.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<SecretarioAcademicoDTO> findAll() {
        log.debug("Request to get all SecretarioAcademicos");
        List<SecretarioAcademicoDTO> result = secretarioAcademicoRepository.findAll().stream()
            .map(secretarioAcademicoMapper::secretarioAcademicoToSecretarioAcademicoDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one secretarioAcademico by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public SecretarioAcademicoDTO findOne(Long id) {
        log.debug("Request to get SecretarioAcademico : {}", id);
        SecretarioAcademico secretarioAcademico = secretarioAcademicoRepository.findOne(id);
        SecretarioAcademicoDTO secretarioAcademicoDTO = secretarioAcademicoMapper.secretarioAcademicoToSecretarioAcademicoDTO(secretarioAcademico);
        return secretarioAcademicoDTO;
    }

    /**
     *  Delete the  secretarioAcademico by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SecretarioAcademico : {}", id);
        secretarioAcademicoRepository.delete(id);
    }
}
