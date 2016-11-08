package br.ufrj.cos482.service.impl;

import br.ufrj.cos482.service.LogDoSistemaService;
import br.ufrj.cos482.domain.LogDoSistema;
import br.ufrj.cos482.repository.LogDoSistemaRepository;
import br.ufrj.cos482.service.dto.LogDoSistemaDTO;
import br.ufrj.cos482.service.mapper.LogDoSistemaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing LogDoSistema.
 */
@Service
@Transactional
public class LogDoSistemaServiceImpl implements LogDoSistemaService{

    private final Logger log = LoggerFactory.getLogger(LogDoSistemaServiceImpl.class);
    
    @Inject
    private LogDoSistemaRepository logDoSistemaRepository;

    @Inject
    private LogDoSistemaMapper logDoSistemaMapper;

    /**
     * Save a logDoSistema.
     *
     * @param logDoSistemaDTO the entity to save
     * @return the persisted entity
     */
    public LogDoSistemaDTO save(LogDoSistemaDTO logDoSistemaDTO) {
        log.debug("Request to save LogDoSistema : {}", logDoSistemaDTO);
        LogDoSistema logDoSistema = logDoSistemaMapper.logDoSistemaDTOToLogDoSistema(logDoSistemaDTO);
        logDoSistema = logDoSistemaRepository.save(logDoSistema);
        LogDoSistemaDTO result = logDoSistemaMapper.logDoSistemaToLogDoSistemaDTO(logDoSistema);
        return result;
    }

    /**
     *  Get all the logDoSistemas.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<LogDoSistemaDTO> findAll() {
        log.debug("Request to get all LogDoSistemas");
        List<LogDoSistemaDTO> result = logDoSistemaRepository.findAll().stream()
            .map(logDoSistemaMapper::logDoSistemaToLogDoSistemaDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one logDoSistema by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public LogDoSistemaDTO findOne(Long id) {
        log.debug("Request to get LogDoSistema : {}", id);
        LogDoSistema logDoSistema = logDoSistemaRepository.findOne(id);
        LogDoSistemaDTO logDoSistemaDTO = logDoSistemaMapper.logDoSistemaToLogDoSistemaDTO(logDoSistema);
        return logDoSistemaDTO;
    }

    /**
     *  Delete the  logDoSistema by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete LogDoSistema : {}", id);
        logDoSistemaRepository.delete(id);
    }
}
